/*
 * Lodgings schema and data accessor methods.
 */

const mysqlPool = require('../lib/mysqlPool');

const { extractValidFields } = require('../lib/validation');

/*
 * Schema for a lodging.
 */
const LodgingSchema = {
  name: { required: true },
  description: { required: false },
  street: { required: true },
  city: { required: true },
  state: { required: true },
  zip: { required: true },
  price: { required: true },
  ownerid: { required: true }
};
exports.LodgingSchema = LodgingSchema;

/*
 * SELECT COUNT(*) FROM lodgings;
 */
async function getLodgingsCount() {
  const [ results ] = await mysqlPool.query(
    "SELECT COUNT(*) AS count FROM lodgings"
  );
  console.log("  -- results:", results);
  return results[0].count;
}
exports.getLodgingsCount = getLodgingsCount;

/*
 * SELECT * FROM lodgings ORDER BY id LIMIT <offset>,<pageSize>
 */
async function getLodgingsPage(page) {
  const count = await getLodgingsCount();
  const pageSize = 10;
  const lastPage = Math.ceil(count / pageSize);
  page = page > lastPage ? lastPage : page;
  page = page < 1 ? 1 : page;
  const offset = (page - 1) * pageSize;

  /*
   * offset = "; DROP TABLES *;"
   */
  const [ results ] = await mysqlPool.query(
    "SELECT * FROM lodgings ORDER BY id LIMIT ?,?",
    [ offset, pageSize ]
  );

  return {
    lodgings: results,
    page: page,
    totalPages: lastPage,
    pageSize: pageSize,
    count: count
  };
}
exports.getLodgingsPage = getLodgingsPage;

/*
 * INSERT INTO lodgings SET ...;
 */
async function insertNewLodging(lodging) {
  lodging = extractValidFields(lodging, LodgingSchema);
  const [ result ] = await mysqlPool.query(
    "INSERT INTO lodgings SET ?",
    lodging
  );
  return result.insertId;
}
exports.insertNewLodging = insertNewLodging;
