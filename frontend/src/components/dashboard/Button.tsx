import type { ReactNode } from "react";

interface ButtonProps {
    label: string,
    icon?: ReactNode; 

}

export function Button({ label, icon }: ButtonProps ) {
    return (
    <button className="btn-dashboard">
        <span className="btn-text">{label}</span>
        {icon && <span className="btn-icon">{icon}</span>}
    </button>
    );
}

