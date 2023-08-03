export const selectAllPosts = state => state.posts.posts;
export const selectIsLoading = state => state.posts.isLoading;
// export const selectCurrentUserPosts = state => {
//     return state.posts.posts.filter(
//         item => (item.uid = state.authorization.userId)
//     );
// };

export const selectCurrentUserPosts = (state, id) => {
    // console.log(id);
    // console.log(state.posts.posts.filter(item => Object.values(item)[0].userId === id));
    // state.posts.posts.map(item =>
    //     console.log(Object.values(item)[0].userId === id)
    // );
    return state.posts.posts.filter(item => Object.values(item)[0].userId === id);
};

export const selectComments = (state, id) => {
    const comments = state.posts.posts.filter(item => item[id]);
    return comments[0][id].comments;
};

export const selectCommentatorsPhoto = (state, id) => {
    const avatar = state.posts.commentatorsPhoto.find(
        avatar => avatar.uid === id
    );
    return avatar.url;
};
