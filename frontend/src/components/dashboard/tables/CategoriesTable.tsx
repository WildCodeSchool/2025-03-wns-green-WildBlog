import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import type { CategoryData } from "../../../types/CategoryData";
import { HiOutlinePencil } from "react-icons/hi";

interface CategoriesTableProps {
  categories: CategoryData[];
  onEdit: (category: CategoryData) => void;
}

export function CategoriesTable({ categories, onEdit }: CategoriesTableProps) {
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
          {categories.map((cat) => (
            <TableRow
              key={cat.id}
              className="bg-white cursor-pointer border-b border-wild-border-grey"
            >
              <TableCell>{cat.name}</TableCell>
              <TableCell>{cat.description ?? '-'}</TableCell>
              <TableCell>{new Date(cat.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{cat.name}</TableCell>
              <TableCell>
                <HiOutlinePencil
                  className="text-gray-600 hover:text-gray-900 cursor-pointer"
                  size={16}
                  onClick={() => onEdit(cat)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
