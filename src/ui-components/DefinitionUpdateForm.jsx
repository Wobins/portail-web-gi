/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Definition } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function DefinitionUpdateForm(props) {
  const {
    id: idProp,
    definition: definitionModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    term: "",
    meaning: "",
  };
  const [term, setTerm] = React.useState(initialValues.term);
  const [meaning, setMeaning] = React.useState(initialValues.meaning);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = definitionRecord
      ? { ...initialValues, ...definitionRecord }
      : initialValues;
    setTerm(cleanValues.term);
    setMeaning(cleanValues.meaning);
    setErrors({});
  };
  const [definitionRecord, setDefinitionRecord] =
    React.useState(definitionModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Definition, idProp)
        : definitionModelProp;
      setDefinitionRecord(record);
    };
    queryData();
  }, [idProp, definitionModelProp]);
  React.useEffect(resetStateValues, [definitionRecord]);
  const validations = {
    term: [],
    meaning: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          term,
          meaning,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Definition.copyOf(definitionRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "DefinitionUpdateForm")}
      {...rest}
    >
      <TextField
        label="Term"
        isRequired={false}
        isReadOnly={false}
        value={term}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              term: value,
              meaning,
            };
            const result = onChange(modelFields);
            value = result?.term ?? value;
          }
          if (errors.term?.hasError) {
            runValidationTasks("term", value);
          }
          setTerm(value);
        }}
        onBlur={() => runValidationTasks("term", term)}
        errorMessage={errors.term?.errorMessage}
        hasError={errors.term?.hasError}
        {...getOverrideProps(overrides, "term")}
      ></TextField>
      <TextField
        label="Meaning"
        isRequired={false}
        isReadOnly={false}
        value={meaning}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              term,
              meaning: value,
            };
            const result = onChange(modelFields);
            value = result?.meaning ?? value;
          }
          if (errors.meaning?.hasError) {
            runValidationTasks("meaning", value);
          }
          setMeaning(value);
        }}
        onBlur={() => runValidationTasks("meaning", meaning)}
        errorMessage={errors.meaning?.errorMessage}
        hasError={errors.meaning?.hasError}
        {...getOverrideProps(overrides, "meaning")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || definitionModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || definitionModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
