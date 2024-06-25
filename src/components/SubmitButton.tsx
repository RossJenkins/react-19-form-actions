import { FC, PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';

export const SubmitButton: FC<PropsWithChildren> = ({ children }) => {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending}>
            {children}
        </button>
    );
};