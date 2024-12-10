import { redirect } from "react-router-dom";
import { deleteContactAll } from "../contacts";

export async function action() {
    await deleteContactAll();
    return redirect("/");
}