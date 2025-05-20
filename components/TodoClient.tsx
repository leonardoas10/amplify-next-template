'use client';

import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
// import { useAuthenticator } from '@aws-amplify/ui
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';

// Configure Amplify
Amplify.configure(outputs, { ssr: true });

// Generate the client outside of the component
const client = generateClient<Schema>();

export function TodoClient({
    initialTodos,
}: {
    initialTodos: Schema['Todo']['type'][];
}) {
    const [todos, setTodos] = useState(initialTodos);

    useEffect(() => {
        const subscription = client.models.Todo.observeQuery().subscribe({
            next: (result) => {
                console.log('Subscription update:', result);
                // Use functional update to ensure we're working with the latest state
                setTodos(() => [...result.items]);
            },
            error: (error) => console.error('Subscription error:', error),
        });

        // Clean up subscription on unmount
        return () => {
            console.log('Cleaning up subscription');
            subscription.unsubscribe();
        };
    }, []);

    function createTodo() {
        const content = window.prompt('Todo content');
        if (content) {
            client.models.Todo.create({ content })
                .then((result) => console.log('Todo created:', result))
                .catch((error) => console.error('Error creating todo:', error));
        }
    }

    function deleteTodo(id: string) {
        client.models.Todo.delete({ id })
            .then((result) => console.log('Todo deleted:', result))
            .catch((error) => console.error('Error deleting todo:', error));
    }

    return (
        <main>
            <h1>My todos ({todos.length})</h1>
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
