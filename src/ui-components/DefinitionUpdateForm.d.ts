/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Definition } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DefinitionUpdateFormInputValues = {
    term?: string;
    meaning?: string;
};
export declare type DefinitionUpdateFormValidationValues = {
    term?: ValidationFunction<string>;
    meaning?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DefinitionUpdateFormOverridesProps = {
    DefinitionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    term?: PrimitiveOverrideProps<TextFieldProps>;
    meaning?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DefinitionUpdateFormProps = React.PropsWithChildren<{
    overrides?: DefinitionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    definition?: Definition;
    onSubmit?: (fields: DefinitionUpdateFormInputValues) => DefinitionUpdateFormInputValues;
    onSuccess?: (fields: DefinitionUpdateFormInputValues) => void;
    onError?: (fields: DefinitionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DefinitionUpdateFormInputValues) => DefinitionUpdateFormInputValues;
    onValidate?: DefinitionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DefinitionUpdateForm(props: DefinitionUpdateFormProps): React.ReactElement;
