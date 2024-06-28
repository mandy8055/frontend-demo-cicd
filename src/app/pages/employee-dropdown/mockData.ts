const delegateOptions = [
  'delegate, sanity',
  'Franklin, David',
  'user, test19april_cd',
];
const touchpointProfiles = [
  'delegate, sanity',
  'Franklin, David',
  'user, test19april_cd',
];

// function generateRandomStringArray(length: number, charSet: string) {
//   return Array.from(
//     { length },
//     () =>
//       Array.from(
//         { length: 5 },
//         () => charSet[Math.floor(Math.random() * charSet.length)],
//       ).join(''), // Fixed length of 5
//   ).map((randomString) => ({ value: randomString, key: generateUUID() }));
// }

// const charSet =
//   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Modify for desired characters
// const touchpointProfiles = generateRandomStringArray(5000, charSet);

export { delegateOptions, touchpointProfiles };

// TODO
// 1. Get and Store mock data for delegateOptions, touchpointProfile, etc. -- DONE
// 2. Figure out an approach to hide Profile section on employee dropdown page. -- DONE
// 3. Take pull from Rahul/Aman branch to prepare the running prototype.
// 4. Write test cases.
// 5. Refactor code to make it production ready. -- DONE
