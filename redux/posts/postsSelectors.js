export const selectAllPosts = state => state.posts.posts;
export const selectCurrentUserPosts = state => {
    return state.posts.posts.filter(
        item => (item.uid = state.authorization.userId)
    );
};

export const selectComments = (state, id) => {
    const comments = state.posts.posts.filter(item => item[id]);
    return comments[0][id].comments;
};
