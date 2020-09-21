<template>
  <Table row-key="id" :load-data="handleLoadData" :columns="columns16" :data="data13" border></Table>
</template>
<script>
export default {
  data() {
    return {
      columns16: [
        {
          title: "Name",
          key: "name",
          tree: true,
        },
        {
          title: "Age",
          key: "age",
        },
        {
          title: "Address",
          key: "address",
        },
      ],
      data13: [
        {
          id: "100",
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          _loading: false,
          children: [],
        },
        {
          id: "101",
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          _loading: false,
          children: [],
        },
        {
          id: "102",
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
        },
        {
          id: "103",
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
        },
      ],
    };
  },
  methods: {
    handleLoadData(item, callback) {
      console.log(item);
      setTimeout(() => {
        const data = [
          {
            id: item.id+"10100",
            name: item.id+"John Brown",
            age: item.id+18,
            address: item.id+"New York No. 1 Lake Park",
          },
          {
            id: item.id+"10101",
            name: item.id+"Joe Blackn",
            age: item.id+30,
            address: item.id+"Sydney No. 1 Lake Park",
          },
        ];
        console.log(data);
        callback(data);
      }, 300);
    },
  },
};
</script>
