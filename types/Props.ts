import { type Employee } from "./Employee"

export interface EditWindowProps{
    editedEmployee: Employee|null,
    visible: boolean
}