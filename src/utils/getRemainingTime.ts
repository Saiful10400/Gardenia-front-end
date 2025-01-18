function timeDifference(dateTime:string):string {
    const currentDate = new Date();
    const givenDate = new Date(dateTime);
  
    // Calculate the difference in milliseconds
    const diffInMs = currentDate.getTime() - givenDate.getTime();
  
    // Convert milliseconds to days, hours, and minutes
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
    if (diffInDays > 0) {
      return diffInDays === 1 ? `${diffInDays} day` : `${diffInDays} days`;
    }
  
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours > 0) {
      return diffInHours === 1 ? `${diffInHours} hour` : `${diffInHours} hours`;
    }
  
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    return diffInMinutes === 1 ? `${diffInMinutes} minute` : `${diffInMinutes} minutes`;
  }

  export default timeDifference

