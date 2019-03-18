const fetchEvents = async (instance, eventName, filter = {}, fromBlock = 0, toBlock = 'latest') => {
  return await instance.getPastEvents(
    eventName,
    {
      filter,
      fromBlock,
      toBlock
    }
  )
}

module.exports = {
  fetchEvents
}
