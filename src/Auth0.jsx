import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

  const domain = "dev-nsmed2hs033wqp5x.eu.auth0.com";
  const clientId = "7boiTUvg1lRUwS5BtTpTaxRpQwI62DLc";
  const authorizationParams = { redirect_uri: 'https://stasholo.github.io/ChatMate/' };

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={authorizationParams}
    onRedirectCallback={onRedirectCallback}
    useRefreshTokens={true}
    cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};