import styles from '../styles/Index.module.scss';
import Layout from "./components/Layout";
import {getNotesApi} from "../api/notes";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteNote, setNotes} from "../redux/notesReducer";
import {Card, Button} from "antd";
import Link from "next/link";

export default function Index({notes}) {
    const state = useSelector(state => state.notes)
    const dispatch = useDispatch()

    const deleteNoteHandler = (id) => {
        dispatch(deleteNote(id))
    }

    useEffect(() => {
        if (notes.success) {
            dispatch(setNotes(notes.data))
        }
    }, [JSON.stringify(notes.data)])

    return (
        <Layout title={'Notes'}>
            <div className={styles.container}>
                {state.notes.length
                    ? state.notes.map(note => {
                        return (
                            <Card key={note._id} title={note.title} hoverable
                                  actions={[
                                      <Link href={`/${note._id}/edit`}>
                                          <Button type="primary"> Edit </Button>
                                      </Link>,
                                      <Button onClick={() => deleteNoteHandler(note._id)} type="danger"
                                              loading={state.isDeletingInProcess.some(id => id === note._id)}>
                                          Delete
                                      </Button>
                                  ]}
                            >
                                <p>{note.description}</p>
                            </Card>
                        )
                    })
                    : <div className={styles.noNotes}>
                        <p>There are no notes yet :)</p>
                        <Link href={'/new'}>
                            <a>Create new note!</a>
                        </Link>
                    </div>
                }
            </div>
        </Layout>
    )
}

export const getServerSideProps = async () => {
    const notes = await getNotesApi()
    return {props: {notes}}
}