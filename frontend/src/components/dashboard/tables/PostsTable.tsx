
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import type { PostData } from "../../../types/PostData";
import { BagdesStatus } from "../BagdesStatus";
import { DropdownActionButton } from "../DropdownActionButton";
import { useState } from "react";
import { ConfirmModal } from "../ConfirmModal";
import { useMutation } from "@apollo/client/react";
import { DELETE_POST } from '../../../gql/posts/deletePost';
import { useNavigate } from "react-router-dom";

interface PostsTableProps {
  posts: PostData[];
}

export function PostsTable({posts}: PostsTableProps) {

  const[postsList, setPostList] = useState(posts);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
  const navigate = useNavigate();

  const [deletePost] = useMutation(DELETE_POST);

  const openTheModal = (selectedPost: PostData) => {
    setOpenModal(true);
    console.log(selectedPost)
    setSelectedPost(selectedPost)
  }

  const handleDelete = async (selectedPostId: number) => {
    try {
      await deletePost({variables: {
        id:selectedPostId
      }});
      console.log("post supprimé");
      setOpenModal(false);
      setSelectedPost(null);
      setPostList(prev => prev.filter(post => Number(post.id) !== selectedPostId));
    } catch(error) {
        console.error("Erreur lors de la suppression :", error);
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table hoverable>
          <TableHead>
            <TableRow>
              <TableHeadCell>Image</TableHeadCell>
              <TableHeadCell>Titre</TableHeadCell>
              <TableHeadCell>Auteur</TableHeadCell>
              <TableHeadCell>Créé le</TableHeadCell>
              <TableHeadCell>Statut</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">

          {postsList.map((post) => (
            <TableRow key={post.id} className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {post.coverImage ? <img src={post.coverImage} alt={post.title} className="w-16 h-10 object-cover rounded" /> : "—"}
              </TableCell>
              <TableCell
                onClick={() => navigate(`/admin/articles/${post.id}`)}>{post.title}
              </TableCell>
              <TableCell>{post.author?.firstName} {post.author?.lastName}</TableCell>
              <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <BagdesStatus statusLabel= {post.statusLabel}></BagdesStatus>
              </TableCell>
              <TableCell className="table-cell-relative-fix">
                <DropdownActionButton 
                  id={Number(post.id)} 
                  onDelete={()=> openTheModal(post)} 
                  />
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>

        <ConfirmModal 
            openModal={openModal}
            closeModal={() => setOpenModal(false)}
            message={`Êtes-vous sûr de vouloir supprimer l'article : " ${selectedPost?.title} " ?`}
            onConfirm={() => { if (selectedPost) handleDelete(Number(selectedPost.id)); }}
          />
      </div>
    </>

  );
}
