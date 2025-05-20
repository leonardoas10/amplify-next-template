'use client';

import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
// import { useAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs, { ssr: true });

const client = generateClient<Schema>();

export function TodoClient({
    initialTodos,
}: {
    initialTodos: Schema['Todo']['type'][];
}) {
    const [todos, setTodos] = useState(initialTodos);
    // const { signOut } = useAuthenticator();

    useEffect(() => {
        const sub = client.models.Todo.observeQuery().subscribe({
            next: (data) => setTodos(data.items),
        });
        return () => sub.unsubscribe();
    }, []);

    function createTodo() {
        const content = window.prompt('Todo content');
        if (content) {
            client.models.Todo.create({ content });
        }
    }

    function deleteTodo(id: string) {
        client.models.Todo.delete({ id });
    }

    return (
        <main>
            <h1>My todos</h1>
            <button onClick={createTodo}>+ new</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} onClick={() => deleteTodo(todo.id)}>
                        {todo.content}
                    </li>
                ))}
            </ul>
            <div>
                🥳 App successfully hosted. Try creating a new todo.
                <br />
                <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
                    Review next steps of this tutorial.
                </a>
            </div>
            {/* <button onClick={signOut}>Sign out</button> */}
        </main>
    );
}
