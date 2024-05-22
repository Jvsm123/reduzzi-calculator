import { firebase } from "./firebase";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore/lite";
import { v4 as uuid } from "uuid";

const saveData = async (data, user) => {
  const db = getFirestore(firebase);
  try {
    const res = await setDoc(doc(db, "Usuarios", uuid()), {
      name: user.displayName,
      email: user.email,
      googleUserUid: user.uid,
      data: new Date().toLocaleDateString("pt-BR"),
      metroTotal: data.metroTotal,
      totalImpostoComReducao: data.totalImpostoComReducao,
      totalImpostoSemReducao: data.totalImpostoSemReducao,
    });

    console.log("Dados salvos!");
  } catch (e) {
    console.error("Infelizmente ocorreu um erro ao tentar salvar os dados \n", e);
  }
};

export { saveData };
