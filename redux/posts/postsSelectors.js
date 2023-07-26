export const selectAllPosts = state => state.posts.posts;
export const selectCurrentUserPosts = state => {
    return state.posts.posts.filter(
        item => (item.uid = state.authorization.userId)
    );
};
// export const selectComments = state => {
//     return state.posts.posts.comments.filter(
//         item => (item.id = state.posts.posts.id)
//     );
// };
export const selectComments = state => {
    return state.posts.posts.filter(item => item["8HszzGPyXHqdy7iy"]);
    // це дописати
};
