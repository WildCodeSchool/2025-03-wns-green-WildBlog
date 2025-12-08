
import { Dropdown, DropdownItem } from "flowbite-react";
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface DropdownActionButtonProps {
  id: number;
  onDelete?: (id: number) => void
  showEdit?: boolean
  showView?: boolean
  showDelete?: boolean
}

export function DropdownActionButton({id, onDelete, showEdit=true, showView=true, showDelete = true }: DropdownActionButtonProps) {
    const navigate = useNavigate();
    return (
        <Dropdown label="Action" dismissOnClick={false}>
            {showEdit && (
                <DropdownItem 
                    icon={HiOutlinePencil}
                    onClick={() => navigate(`/admin/articles/${id}/modifier`)}
                >
                Modifier
                </DropdownItem>
            )}
            {showView && (
                <DropdownItem 
                    icon={HiOutlineEye}
                    onClick={() => navigate(`/admin/articles/${id}`)}
            >
                Voir
            </DropdownItem>
            )}

            {/* FIXME: v2 pour programmer un article depuis une modale */}
            {/* <DropdownItem icon={HiOutlineClock}>
                Programmer
            </DropdownItem> */}

            {showDelete && (
                <DropdownItem 
                    icon={HiOutlineTrash}
                    onClick={() => onDelete?.(id)} // <-- ici on déclenche l'ouverture de la modale
                >
                    Supprimer
                </DropdownItem>
            )}

        </Dropdown>
        
    );
}
