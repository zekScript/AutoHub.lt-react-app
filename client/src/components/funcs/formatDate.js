
export default function formatDate(date){
     return new Date(date).toISOString().split('T')[0];

}