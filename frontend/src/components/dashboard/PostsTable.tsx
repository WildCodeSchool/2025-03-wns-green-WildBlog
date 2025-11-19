
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import type { PostData } from "../../types/PostData";
import { BagdesStatus } from "./BagdesStatus";
import { DropDownButton } from "./DropDownButton";

interface PostsTableProps {
  posts: PostData[];
}

export function PostsTable({posts}: PostsTableProps) {

  return (
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
        {posts.map((post) => (
          <TableRow key={post.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {post.coverImage ? <img src={post.coverImage} alt={post.title} className="w-16 h-10 object-cover rounded" /> : "—"}
            </TableCell>
            <TableCell>{post.title}</TableCell>
            <TableCell>{post.author?.firstName} {post.author?.lastName}</TableCell>
            <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <BagdesStatus statusLabel= {post.statusLabel}></BagdesStatus>
            </TableCell>
            <TableCell>
              <DropDownButton/>
            </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </div>
  );
}
