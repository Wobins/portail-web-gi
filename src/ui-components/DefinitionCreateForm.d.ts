/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DefinitionCreateFormInputValues = {
    term?: string;
    meaning?: string;
};
export declare type DefinitionCreateFormValidationValues = {
    term?: ValidationFunction<string>;
    meaning?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DefinitionCreateFormOverridesProps = {
    DefinitionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    term?: PrimitiveOverrideProps<TextFieldProps>;
    meaning?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DefinitionCreateFormProps = React.PropsWithChildren<{
    overrides?: DefinitionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DefinitionCreateFormInputValues) => DefinitionCreateFormInputValues;
    onSuccess?: (fields: DefinitionCreateFormInputValues) => void;
    onError?: (fields: DefinitionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DefinitionCreateFormInputValues) => DefinitionCreateFormInputValues;
    onValidate?: DefinitionCreateFormValidationValues;
} & React.CSSProperties>;
export default function DefinitionCreateForm(props: DefinitionCreateFormProps): React.ReactElement;
