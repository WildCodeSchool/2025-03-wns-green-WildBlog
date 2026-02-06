import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { LIKE_POST, IS_POST_LIKED_BY_USER } from "../gql/likes/likes";
import { useAuth } from "./useAuth";

// Gestion de l'ID anonyme en localStorage
const ANONYMOUS_ID_KEY = "wildblog_anonymous_id";
const LIKES_KEY = "wildblog_likes"; // Nouveau key pour stocker les likes localement

const getAnonymousId = (): string => {
  let anonymousId = localStorage.getItem(ANONYMOUS_ID_KEY);
  if (!anonymousId) {
    // Générer un UUID simple côté client
    anonymousId =
      "anon_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now();
    localStorage.setItem(ANONYMOUS_ID_KEY, anonymousId);
  }
  return anonymousId;
};

// Gestion du cache local des likes
const getLocalLikes = (): Record<string, boolean> => {
  const likes = localStorage.getItem(LIKES_KEY);
  return likes ? JSON.parse(likes) : {};
};

const setLocalLike = (
  postId: number,
  anonymousId: string,
  isLiked: boolean,
) => {
  const likes = getLocalLikes();
  const key = `${postId}_${anonymousId}`;
  if (isLiked) {
    likes[key] = true;
  } else {
    delete likes[key];
  }
  localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
};

const getLocalLike = (postId: number, anonymousId: string): boolean => {
  const likes = getLocalLikes();
  const key = `${postId}_${anonymousId}`;
  return Boolean(likes[key]);
};

interface LikePostData {
  likePost: {
    id: number;
    likesCount: number;
    isLiked: boolean;
    anonymousId?: string;
  };
}

interface IsPostLikedData {
  isPostLikedByUser: boolean;
}

export const useLikes = (postId: number, initialLikesCount: number = 0) => {
  const { user } = useAuth();
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLiked, setIsLiked] = useState(false);
  const anonymousId = user ? undefined : getAnonymousId();

  // Initialiser avec le cache local en premier
  useEffect(() => {
    if (!user && anonymousId) {
      const localLikeStatus = getLocalLike(postId, anonymousId);
      setIsLiked(localLikeStatus);
    }
  }, [postId, anonymousId, user]);

  // Query pour vérifier si le post est déjà liké
  const { data: isLikedData, refetch: refetchIsLiked } =
    useQuery<IsPostLikedData>(IS_POST_LIKED_BY_USER, {
      variables: { postId, anonymousId },
      skip: !postId,
      fetchPolicy: "cache-and-network", // Force la vérification réseau
      notifyOnNetworkStatusChange: true,
    });

  // Mutation pour liker/unliker
  const [likePostMutation, { loading: isLiking }] = useMutation<LikePostData>(
    LIKE_POST,
    {
      onCompleted: (data) => {
        setLikesCount(data.likePost.likesCount);
        setIsLiked(data.likePost.isLiked);

        // Synchroniser le cache local pour les utilisateurs anonymes
        if (!user && anonymousId) {
          setLocalLike(postId, anonymousId, data.likePost.isLiked);
        }

        // Si c'est un utilisateur anonyme et qu'on reçoit un nouvel anonymousId, le sauvegarder
        if (data.likePost.anonymousId && !user) {
          localStorage.setItem(ANONYMOUS_ID_KEY, data.likePost.anonymousId);
        }
      },
      onError: (error) => {
        console.error("Erreur lors du like:", error);
      },
    },
  );

  // Mettre à jour l'état isLiked quand les données arrivent du serveur
  useEffect(() => {
    if (isLikedData?.isPostLikedByUser !== undefined) {
      const serverIsLiked = isLikedData.isPostLikedByUser;
      setIsLiked(serverIsLiked);

      // Synchroniser le cache local avec les données serveur
      if (!user && anonymousId) {
        setLocalLike(postId, anonymousId, serverIsLiked);
      }
    }
  }, [isLikedData, postId, anonymousId, user]);

  // Mettre à jour le compteur de likes si la prop change
  useEffect(() => {
    setLikesCount(initialLikesCount);
  }, [initialLikesCount]);

  const handleLike = async () => {
    try {
      // Mise à jour optimiste pour une meilleure UX
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);
      setLikesCount((prev) => (newIsLiked ? prev + 1 : prev - 1));

      // Mettre à jour le cache local immédiatement
      if (!user && anonymousId) {
        setLocalLike(postId, anonymousId, newIsLiked);
      }

      await likePostMutation({
        variables: {
          postId: Number(postId),
          anonymousId,
        },
      });
    } catch (error) {
      // En cas d'erreur, restaurer l'état précédent
      setIsLiked(!isLiked);
      setLikesCount((prev) => (!isLiked ? prev - 1 : prev + 1));

      if (!user && anonymousId) {
        setLocalLike(postId, anonymousId, isLiked);
      }

      console.error("Erreur lors du like:", error);
    }
  };

  return {
    likesCount,
    isLiked,
    isLiking,
    handleLike,
    refetchIsLiked,
  };
};
