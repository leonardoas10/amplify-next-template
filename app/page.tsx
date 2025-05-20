import { cookiesClient } from '@/utils/amplify-utils';
import { TodoClient } from '@/components/TodoClient';

export default async function Home() {
    const { data: todos } = await cookiesClient.models.Todo.list();

    return <TodoClient initialTodos={todos} />;
}
