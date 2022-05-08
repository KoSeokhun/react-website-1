// import React from 'react';
// import { GoogleLogin } from 'react-google-login';
// import { GOOGLE_JAVASCRIPT_KEY } from '../../../Config';

// const Google = ({ oAuthLoginHandler }) => {
//     // const onSuccess = async (response) => {
//     //     console.log(response);

//     //     const { googleId, profileObj: { email, name } } = response;

//     //     await onSocial({
//     //         socialId: googleId,
//     //         socialType: 'google',
//     //         email,
//     //         nickname: name
//     //     });
//     // }

//     const onFailure = (error) => {
//         console.log(error);
//     }

//     return (
//         <div>
//             <GoogleLogin
//                 clientId={GOOGLE_JAVASCRIPT_KEY}
//                 responseType={"id_token"}
//                 onSuccess={oAuthLoginHandler}
//                 onFailure={onFailure} />
//         </div>
//     )
// };
// export default Google;