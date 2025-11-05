# Results & Test Cases

## 1) Successful run (keys match, message OK)
![Success run](img/run-ok.png){ width=720 }

- Both parties compute the same shared key.
- Encryption and decryption round-trip equals the original message.

## 2) Invalid prime \( q \) validation
![Invalid prime](img/invalid-prime.png){ width=720 }

- Non-prime input (e.g., 2, 6, 8…) is rejected with a clear prompt to retry.

## 3) Short message (< 20 chars) validation
![Short message](img/short-msg.png){ width=720 }

- Messages shorter than 20 characters trigger a validation error and a re-prompt.

## 4) Live Mode (manual/auto parameters and keys)
- Option to **enter** \( q \) and \( \alpha \) or **auto-generate** both.
- Option to **enter** private keys or **auto-generate** them.
