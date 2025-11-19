import type { IconType } from "react-icons";


interface ButtonProps {
    label: string,
    icon?: IconType; 

}

export function Button({ label, icon: Icon }: ButtonProps ) {
    return (
    <button className="btn-dashboard">
        <span className="btn-text">{label}</span>
        {Icon && (
            <span className="btn-icon">
                <Icon className="w-5 h-5" />
            </span>
        )}    
    </button>
    );
}

