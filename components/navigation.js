export const getStaticProps = async ()=>{
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()

    return{
        props: {posts : data}
    }
}




const Navigation = ({posts}) => {
    return (
        <>
            {posts.map((post)=>(
                <div>
                    <h3>{post.title}</h3>
                </div>
            ))}
        </>
    );
}
 
export default Navigation;