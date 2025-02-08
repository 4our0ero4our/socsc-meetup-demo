import axios from "axios";
const SUI_RPC_URL = `https://fullnode.devnet.sui.io:443`;

export async function getObject(objectId) {
  try {
    const requestData = {
      jsonrpc: "2.0",
      id: 1,
      method: "sui_getObject",
      params: [
        objectId,
        {
          showType: true,
          showOwner: true,
          showPreviousTransaction: true,
          showDisplay: false,
          showContent: true,
          showBcs: false,
          showStorageRebate: true,
        },
      ],
    };

    const response = await axios.post(SUI_RPC_URL, requestData);

    if (response.data.result && response.data.result.data) {
      // console.log("✅ Dynamic Field Object:", response.data.result.data);
      const res = response.data.result.data.content.fields.students.map(
        (student) => student.fields
      );
    //   console.log(res);
      return res.map(({ isMale, ...rest }) => ({
        ...rest,
        gender: isMale ? "Male" : "Female",
      }));
    } else {
      console.error("⚠️ Object not found or error:", response.data);
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching dynamic field object:", error);
    return null;
  }
}

// getObject("0x4f1ca6d15905291d884d66dffe58c95c37388db128776a78726a3a1c1568ee26").then((data) => {
//   console.log(data);
// });
