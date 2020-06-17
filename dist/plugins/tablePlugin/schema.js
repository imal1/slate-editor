import * as violations from "@zykj/slate-schema-violations";
export default {
    blocks: {
        table: {
            nodes: [
                {
                    match: { type: "table-body" },
                },
            ],
            normalize: function (change, error) {
                try {
                    switch (error.code) {
                        case violations.CHILD_TYPE_INVALID:
                            change = change.wrapBlockByKey(error.child.key, "table-body");
                            return change;
                        default:
                            return null;
                    }
                }
                catch (err) {
                    console.error(err.message);
                }
                return change;
            },
        },
    },
};
