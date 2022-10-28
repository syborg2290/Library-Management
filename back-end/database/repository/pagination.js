export const pagination = async (
  model,
  page,
  limit,
  isDesc,
  isPopulate,
  schema_name
) => {
  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const itemsCount = await model.countDocuments().exec();

    const results = {
      results: {},
      pag: {},
    };

    results.pag.currentPage = page;
    results.pag.limit = limit;
    results.pag.pagesCount = Math.ceil(itemsCount / limit);

    if (endIndex < itemsCount) results.next = { page: page + 1, limit: limit };
    if (startIndex > 0) results.prev = { page: page - 1, limit: limit };

    if (!isPopulate) {
      results.results = await model
        .find()
        .sort({ createdAt: isDesc ? -1 : 1 })
        .limit(limit)
        .skip(startIndex);
    } else {
      results.results = await model
        .find()
        .populate(schema_name)
        .sort({ createdAt: isDesc ? -1 : 1 })
        .limit(limit)
        .skip(startIndex)
        .exec();
    }

    return results;
  } catch (error) {
    console.log("Pagination failed!");
  }
};
