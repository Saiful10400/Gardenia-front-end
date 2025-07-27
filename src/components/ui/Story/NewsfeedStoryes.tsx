import { useGetAllStoriesQuery } from "@/Redux/api/api";


const NewsfeedStoryes = () => {

    const { data: AllStorys } = useGetAllStoriesQuery(null)
    
    const storyes=AllStorys?.data||[]
    console.log(storyes)


    return (
        <div>
            click
        </div>
    );
};

export default NewsfeedStoryes;