export function computeRatingSummary(ratings) {
  if (!ratings.length) {
    return {
      punctuality: 0,
      skillQuality: 0,
      paymentBehavior: 0,
      mutualRespect: 0,
    }
  }

  const totals = ratings.reduce(
    (acc, item) => {
      acc.punctuality += item.punctuality
      acc.skillQuality += item.skillQuality
      acc.paymentBehavior += item.paymentBehavior
      acc.mutualRespect += item.mutualRespect
      return acc
    },
    { punctuality: 0, skillQuality: 0, paymentBehavior: 0, mutualRespect: 0 },
  )

  const count = ratings.length

  return {
    punctuality: Number((totals.punctuality / count).toFixed(1)),
    skillQuality: Number((totals.skillQuality / count).toFixed(1)),
    paymentBehavior: Number((totals.paymentBehavior / count).toFixed(1)),
    mutualRespect: Number((totals.mutualRespect / count).toFixed(1)),
  }
}
