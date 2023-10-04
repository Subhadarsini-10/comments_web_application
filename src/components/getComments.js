export const getComments = async () => {
  return [
    {
      id: "1",
      body: "first comment",
      username: "jack",
      usedid: "1",
      parentId: null,
      createdat: "20-03-2023",
    },
    {
      id: "2",
      body: "second comment",
      username: "john",
      usedId: "2",
      parentId: null,
      createdat: "20-05-2023",
    },
    {
      id: "3",
      body: "First comment first child",
      username: "subha",
      usedid: "3",
      parentId: "1",
      createdat: "20-08-2023",
    },
    {
      id: "4",
      body: "Second comment second child",
      username: "fenny",
      usedid: "3",
      parentId: "2",
      createdat: "20-08-2023",
    },
  ];
};

export const createComments = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substring(2, 9),
    body: text,
    parentId,
    userId: "1",
    username: "john",
    createdat: new Date().toISOString(),
  };
};

export const updateComments = async (text) => {
  return { text };
};

export const deleteComments = async () => {
  return {};
};
