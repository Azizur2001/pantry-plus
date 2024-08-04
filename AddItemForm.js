import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import CaptureImage from './CaptureImage';
import { useAuthState } from 'react-firebase-hooks/auth';
import './AddItemForm.css';

const AddItemForm = ({ onAdd, onUpdate }) => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiration, setExpiration] = useState('');
  const [image, setImage] = useState(null);
  const [user] = useAuthState(auth);

  const handleCapture = (imageSrc) => {
    setImage(imageSrc);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const userUid = user.uid;
    const userPantryCollection = collection(db, `users/${userUid}/pantryItems`);

    const q = query(userPantryCollection, where('item', '==', item));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const existingItem = querySnapshot.docs[0];
      const updatedQuantity = parseInt(existingItem.data().quantity) + parseInt(quantity);
      await updateDoc(doc(db, `users/${userUid}/pantryItems`, existingItem.id), { quantity: updatedQuantity, expiration, image });
      onUpdate({ id: existingItem.id, item, quantity: updatedQuantity, expiration, image });
    } else {
      const docRef = await addDoc(userPantryCollection, { item, quantity, expiration, image });
      onAdd({ id: docRef.id, item, quantity, expiration, image });
    }

    setItem('');
    setQuantity('');
    setExpiration('');
    setImage(null);
  };

  return (
    <Paper className="add-item-container" elevation={3}>
      <Typography variant="h6" component="h1" gutterBottom className="add-item-title">
        Add Pantry Item
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="add-item-form"
      >
        <TextField
          label="Name"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="add-item-input"
        />
        <TextField
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="add-item-input"
        />
        <TextField
          label="Expiration Date"
          type="date"
          value={expiration}
          onChange={(e) => setExpiration(e.target.value)}
          className="add-item-input"
          InputLabelProps={{ shrink: true }}
        />
        <CaptureImage onCapture={handleCapture} />
        <div className="button-container">
          <Button
            type="button"
            variant="contained"
            color="primary"
            className="capture-image-button"
          >
            Capture Image
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="add-item-button"
          >
            Add Item
          </Button>
        </div>
      </Box>
    </Paper>
  );
};

export default AddItemForm;



// import React, { useState } from 'react';
// import { TextField, Button, Box, Paper, Typography } from '@mui/material';
// import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
// import { db, auth } from '../firebase';
// import CaptureImage from './CaptureImage';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import './AddItemForm.css';

// const AddItemForm = ({ onAdd, onUpdate }) => {
//   const [item, setItem] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [expiration, setExpiration] = useState('');
//   const [image, setImage] = useState(null);
//   const [user] = useAuthState(auth);

//   const handleCapture = (imageSrc) => {
//     setImage(imageSrc);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) return;

//     const userUid = user.uid;
//     const userPantryCollection = collection(db, `users/${userUid}/pantryItems`);

//     const q = query(userPantryCollection, where('item', '==', item));
//     const querySnapshot = await getDocs(q);
//     if (!querySnapshot.empty) {
//       const existingItem = querySnapshot.docs[0];
//       const updatedQuantity = parseInt(existingItem.data().quantity) + parseInt(quantity);
//       await updateDoc(doc(db, `users/${userUid}/pantryItems`, existingItem.id), { quantity: updatedQuantity, expiration, image });
//       onUpdate({ id: existingItem.id, item, quantity: updatedQuantity, expiration, image });
//     } else {
//       const docRef = await addDoc(userPantryCollection, { item, quantity, expiration, image });
//       onAdd({ id: docRef.id, item, quantity, expiration, image });
//     }

//     setItem('');
//     setQuantity('');
//     setExpiration('');
//     setImage(null);
//   };

//   return (
//     <Paper className="add-item-container" elevation={3}>
//       <Typography variant="h6" component="h1" gutterBottom className="add-item-title">
//         Add Pantry Item
//       </Typography>
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         className="add-item-form"
//       >
//         <TextField
//           label="Name"
//           value={item}
//           onChange={(e) => setItem(e.target.value)}
//           className="add-item-input"
//         />
//         <TextField
//           label="Quantity"
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//           className="add-item-input"
//         />
//         <TextField
//           label="Expiration Date"
//           type="date"
//           value={expiration}
//           onChange={(e) => setExpiration(e.target.value)}
//           className="add-item-input"
//           InputLabelProps={{ shrink: true }}
//         />
//         <CaptureImage onCapture={handleCapture} />
//         <div className="button-container">
//           <Button
//             type="button"
//             variant="contained"
//             color="primary"
//             className="capture-image-button"
//           >
//             Capture Image
//           </Button>
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             className="add-item-button"
//           >
//             Add Item
//           </Button>
//         </div>
//       </Box>
//     </Paper>
//   );
// };

// export default AddItemForm;
