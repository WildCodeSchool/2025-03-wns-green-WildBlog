import { PostStatus } from "../../enums/PostStatus";

interface BagdesStatusProps {
    statusLabel: PostStatus,
}

export function BagdesStatus({ statusLabel }: BagdesStatusProps ) {
    let color = '';

    switch (statusLabel) {
        case PostStatus.PUBLISHED:
            color= "badge badge-published ";
            break;

        case PostStatus.DRAFT:
            color= "badge badge-draft ";
            break;

        case PostStatus.SCHEDULED:
            color= "badge badge-scheduled ";
            break;

        case PostStatus.FINISHED:
            color= "badge badge-finished ";
            break;
    }

    return (
        <span className={color}>{statusLabel}</span>
    );
}