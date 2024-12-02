"use client";

import { useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { ethers } from "ethers";

const TransferEther = () => {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [recipient, setRecipient] = useState(""); // Состояние для адреса получателя
  const [amount, setAmount] = useState(""); // Состояние для суммы перевода
  const [status, setStatus] = useState(""); // Статус операции

  const handleTransfer = async () => {
    if (!isConnected || !walletClient) {
      setStatus("Подключите кошелек.");
      return;
    }

    if (!ethers.isAddress(recipient)) {
      setStatus("Некорректный адрес получателя.");
      return;
    }

    try {
      setStatus("Отправка транзакции...");
      const provider = new ethers.BrowserProvider(walletClient);
      const signer = await provider.getSigner();

      // Отправка транзакции
      const tx = await signer.sendTransaction({
        to: recipient, // Адрес получателя из пользовательского ввода
        value: ethers.parseEther(amount), // Сумма из пользовательского ввода
      });

      const txCheck = await provider.getTransaction(tx.hash);

      console.log({ txCheck });

      setStatus("Транзакция отправлена. Ожидаем подтверждения...");
      await tx.wait(); // Ожидание подтверждения транзакции
      setStatus(`Транзакция подтверждена! Хэш: ${tx.hash}`);
    } catch (error) {
      console.error(error);
      setStatus("Ошибка: " + error.message);
    }
  };

  return (
    <div className="p-5">
      <h1>Перевод ETH</h1>
      {isConnected ? (
        <div>
          <p>Ваш адрес: {address}</p>
          <div>
            <label>Адрес получателя:</label>
            <input
              type="text"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div>
            <label>Сумма (ETH):</label>
            <input
              type="text"
              placeholder="Введите сумму"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button onClick={handleTransfer}>Отправить ETH</button>
          <p>{status}</p>
        </div>
      ) : (
        <p>Пожалуйста, подключите кошелек.</p>
      )}
    </div>
  );
};

export default TransferEther;
