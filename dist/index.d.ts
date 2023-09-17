import * as react from 'react';

interface RenderProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
    placeholder: string;
    unmaskedValue?: string;
    cardType: string;
    ariaLabel?: string;
}
interface CreditCardInputProps {
    render: (props: RenderProps) => React.ReactElement;
}
declare const CreditCardInput: ({ render }: CreditCardInputProps) => react.ReactElement<any, string | react.JSXElementConstructor<any>>;

export { CreditCardInput };