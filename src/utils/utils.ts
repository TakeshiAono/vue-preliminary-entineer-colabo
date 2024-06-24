import _ from "lodash"

export const sortByUpdatedAt = <T extends { updatedAt: string }>(objects: T[]): T[] => {
  return _.sortBy(objects, (object) => new Date(object.updatedAt)).reverse()
}
