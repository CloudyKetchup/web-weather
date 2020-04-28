import React, { Component } from "react";

import { Account } from "../model/Account";

type IContext = {
	account? : Account,
	setAccount : (account? : Account) => void
};

const AccountContext = React.createContext<IContext>({ setAccount : () => {} });
const AccountConsumer = AccountContext.Consumer

type IState = { account : Account | undefined };

class AccountProvider extends Component<{}, IState>
{
  state = { account : undefined }

  setAccount = (account? : Account) => this.setState(prevState => ({ account }));

  render()
  {
    const { children } = this.props;
    const { account } = this.state;
    const { setAccount } = this;

    return (
      <AccountContext.Provider
        value={{ account, setAccount }}
      >
        {children}
      </AccountContext.Provider>
    );
  }
}

export { AccountContext, AccountProvider, AccountConsumer };