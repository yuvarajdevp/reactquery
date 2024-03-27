import './App.css';
import { useQuery } from '@tanstack/react-query';
import Loading from './components/loading.jsx';

function App() {
  const {
    isLoading,
    data: postQuery,
    isError,
  } = useQuery({
    queryKey: ["posts,"],
    queryFn: async () => {
      await wait(1000); // Introduce a delay of 3000 milliseconds (3 seconds)
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const postQuery = await response.json();
      console.log(postQuery);
      return {data:postQuery}; 
    }
  });

  if (isError) {
    return <span>There is no Data Here</span>;
  }

  console.log(postQuery?.data,"postQuery")


  return (
    <>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          postQuery?.data?.map(post => (
            <ul key={post.id}>
              <li>{post.title}</li>
              <li>{post.body}</li>
            </ul>
          ))
        )}
      </div>
    </>
  );
}

function wait(duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

export default App;
