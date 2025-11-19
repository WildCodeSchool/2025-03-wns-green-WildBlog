
import { Dropdown, DropdownItem } from "flowbite-react";
import { HiOutlineClock, HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

export function DropDownButton() {
  return (
    <Dropdown label="Action" dismissOnClick={false}>
        <DropdownItem icon={HiOutlinePencil}>
            Modifier
        </DropdownItem>
        <DropdownItem icon={HiOutlineEye}>
            Voir
        </DropdownItem>
        <DropdownItem icon={HiOutlineClock}>
            Programmer
        </DropdownItem>
        <DropdownItem icon={HiOutlineTrash}>
            Supprimer
        </DropdownItem>
    </Dropdown>
  );
}
