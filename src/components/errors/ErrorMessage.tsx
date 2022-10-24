import {Label} from "@navikt/ds-react";
import React from "react";
import styled from "styled-components";

const StyledErrorMessage = styled(Label)`
    color: var(--navds-semantic-color-feedback-danger-text);
    margin: 0;
`;

interface ErrorMessageProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}

export const ErrorMessage = ({children, ...rest}: ErrorMessageProps) => (
    <StyledErrorMessage aria-live="polite" {...rest} as="p">
        {children}
    </StyledErrorMessage>
);
