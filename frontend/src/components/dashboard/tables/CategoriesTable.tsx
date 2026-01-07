import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import type { CategoryData } from "../../../types/CategoryData";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useMutation } from "@apollo/client/react";
import { DELETE_CATEGORY } from "../../../gql/categories/deleteCategory";
import { useAuth } from "../../../hooks/useAuth";
import { GET_CATEGORIES } from "../../../gql/categories/getCategories";

interface CategoriesTableProps {
  categories: CategoryData[];
  onEdit: (category: CategoryData) => void;
}

export function CategoriesTable({ categories, onEdit }: CategoriesTableProps) {

  const [deleteCategory] = useMutation(DELETE_CATEGORY);
  const { blogId } = useAuth();

  const handleDeleteCategory = async (id: number, name: string) => {
    console.log('hello');

    if (!confirm(`Voulez-vous vraiment supprimer la catégorie "${name}"?`)) return;

    try {
      await deleteCategory({
      variables: { 
        id: Number(id),
        blogId: blogId! 
        }, 
        refetchQueries: [{ query: GET_CATEGORIES, variables: { blogId: blogId! } }],
        awaitRefetchQueries: true,
      });
      
      console.log("Catégorie supprimée");

    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie :", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell>Nom</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
            <TableHeadCell>Créée le</TableHeadCell>
            <TableHeadCell>Nombre d'articles</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {categories.map((category) => (
            <TableRow
              key={category.id}
              className="bg-white cursor-pointer border-b border-wild-border-grey"
            >
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.description ?? '-'}</TableCell>
              <TableCell>{new Date(category.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{category.posts.length}</TableCell>
              {/* <TableCell className="flex">
                <a
                  href="#scroll-to-top"
                  onClick={() => onEdit(category)}
                >
                  <HiOutlinePencil
                    className="text-gray-600 hover:text-gray-900 cursor-pointer"
                    size={16}
                  />
                </a>
                <HiOutlineTrash
                  className="text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                </HiOutlineTrash>
              </TableCell> */}

              <TableCell>
                <div className="flex gap-3">
                  <HiOutlinePencil
                    className="text-gray-600 hover:text-gray-900 cursor-pointer"
                    size={16}
                    onClick={() => onEdit(category)}
                  />
                  <HiOutlineTrash
                    className="text-gray-600 hover:text-gray-900 cursor-pointer"
                    size={16}
                    onClick={() => handleDeleteCategory(Number(category.id), category.name )}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
