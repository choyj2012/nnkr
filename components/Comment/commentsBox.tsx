import { AnswerComment } from "@/lib/types";
import Comment from "./comment";
import HaiComponent from "../Card/hai";

export default async function CommentsBox({id} : {id: string}) {

  const commentsList = await getCommentsList(id);
  return (
    <>
      <div className="flex flex-row items-center border-4 border-green-700 mx-auto p-4 mb-4">
        <HaiComponent hai="?" width="w-[8%]" height="h-auto"/>
        <textarea className="flex-grow border-black border-2 ml-2 mr-2 resize-none"/>
        <button className="border border-black p-1 hover:bg-slate-300">Add</button>
      </div>
      <div className="flex flex-col border-4 border-green-700 mx-auto gap-4">
        {commentsList.map((comment) => {
          return <Comment key={comment.id} comdate={comment} />;
        })}
      </div>
    </>
  );
}




async function getCommentsList(id: string){
  
  const CommentsList: AnswerComment[] = [{
    id: 'kjsfe',
    answer: 'Z1',
    name: 'AAA',
    comment: '흠',
    date: new Date(),
    subComment: []
  }, 
  {
    id: 'akdd',
    answer: 'Z2',
    name: 'BBB',
    comment: '흠..',
    date: new Date(),
    subComment: []
  }]

  return CommentsList;
}