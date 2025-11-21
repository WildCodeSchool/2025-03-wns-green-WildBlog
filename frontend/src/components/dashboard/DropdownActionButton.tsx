
import { Dropdown, DropdownItem } from "flowbite-react";
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface DropdownActionButtonProps {
  id: number;
  onDelete?: (id: number) => void
}

export function DropdownActionButton({id, onDelete }: DropdownActionButtonProps) {
    const navigate = useNavigate();
    return (
        <Dropdown label="Action" dismissOnClick={false}>
            <DropdownItem 
                icon={HiOutlinePencil}
                onClick={() => navigate(`/admin/articles/${id}/modifier`)}
            >
                Modifier
            </DropdownItem>
            <DropdownItem 
                icon={HiOutlineEye}
                onClick={() => navigate(`/admin/articles/${id}`)}
            >
                Voir
            </DropdownItem>
            {/* FIXME: v2 pour programmer un article depuis une modale */}
            {/* <DropdownItem icon={HiOutlineClock}>
                Programmer
            </DropdownItem> */}
            <DropdownItem 
                icon={HiOutlineTrash}
                onClick={() => onDelete?.(id)} // <-- ici on déclenche l'ouverture de la modale
            >
                Supprimer
            </DropdownItem>
        </Dropdown>
        
    );
}
