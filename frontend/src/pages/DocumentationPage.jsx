import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import styled from 'styled-components';
import swaggerJson from '../swagger.json';
import 'swagger-ui-react/swagger-ui.css';

const ScrollContainer = styled.div`
    height: 100vh;
    width: 100vw;
    overflow: scroll;
`;

const SwaggerContainer = styled.div`
    width: 100%; /* Установка ширины на 100% */
    max-width: 90%; /* Более широкая максимальная ширина формы */
    margin: 0 auto;
`;

function DocumentationPage() {
    return (
        <ScrollContainer>
            <SwaggerContainer>
                <SwaggerUI spec={swaggerJson} />
            </SwaggerContainer>
        </ScrollContainer>
    );
}

export default DocumentationPage;
