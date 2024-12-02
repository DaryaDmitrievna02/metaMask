"use client";

import React from "react";

import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import { injected } from "wagmi/connectors";

type Props = {};

const ConnectAccount = (props: Props) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();

  console.log({ address });

  return (
    <div className="p-5">
      <h2>Connect Account</h2>
      <div>
        Current status:
        {address ? <p> Connected {address}</p> : <p>Disconnected</p>}
      </div>
      <div>Balance: </div>

      <button
        style={{ background: "grey", padding: "5px" }}
        onClick={() => disconnect()}
      >
        Disconnect
      </button>

      <button
        style={{ background: "yellowgreen", padding: "5px", marginLeft: "5px" }}
        onClick={() => connect({ connector: injected() })}
      >
        Connect
      </button>
    </div>
  );
};

export default ConnectAccount;
