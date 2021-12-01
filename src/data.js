export default [{ 
     id: 1,
     state: "某单位为定点帮扶村捐建一个乡村图书馆。已知完工时基建支出为总预算的，图书购买支出比基建支出低，比信息化支出高，其他支出之和为4.5万元，最终项目的总支出比总预算结余了3000元。已知图书来源为购买和捐赠，平均每购买1本图书的支出为25元，且购买的图书比接受外来捐赠的图书多。问该乡村图书馆最终拥有的图书数量在以下哪个范围内？",
     answer: "D、超过1.7万本",
     optionName: "单选",
     collected: false,
     option: ['A、不到1 .1 万本 ', 'B、1.1～1.4万本之间 ', 'C、 1.4～1.7万本之间', 'D、超过1.7万本 '],
     value: '',
     explain: `根据题干信息：基建支出为总预算的，图书购买支出比基建支出低，故图书支出为总预算的：，图书购买支出比信息化支出高，故信息化支出为总预算的：；根据最终项目的总支出比总预算结余了3000元，即总支出比总预算少了0.3万元。设总预算为万元，可列方程为，解出，故图书支出为万元，购买图书为本，购买的图书比接受外来捐赠的图书多，故捐赠图书为本，总计购买图书捐赠图书本。
     故正确答案为D。
     备注： 结余属于会计术语， 表示在一定期间各项收入与支出结算之后剩余的数额， 本题中指总预算与总支出结算之后的余额。 `
   },
   {
     id: 2,
     state: `人们常常系统地高估自己对事件的控制程度或影响力，而低估机会、运气等不可控制因素在事件发展过程及其结果上所扮演的角色，这一现象被称为控制错觉。
根据上述定义，下列没有体现控制错觉的是：`,
     answer: "C、某企业经理认为今年当地举办的运动会对企业发展非常有利，预测今年营业额会有所上涨",
     optionName: "单选",
    option: ['A、人们想用骰子掷出“双6”时会在心中默念，用力揉捏骰子，相信这样做就会如愿', 'B、一些股民往往借助几个简单的因素预测大盘指数，结果常常是谬以千里', 'C、某企业经理认为今年当地举办的运动会对企业发展非常有利，预测今年营业额会有所上涨', 'D、景区某摆渡车驾驶员常年走山路，认为自己路况熟、技术好，所以在山路上开得非常快'],
     collected: false,
     value: '',
     explain: `第一步：找出定义关键词。“高估自己对事件的控制程度或影响力”、“低估机会、运气等不可控制因素在事件发展过程及其结果上所扮演的角色”。
第二步：逐一分析选项。

A项：掷骰子是随机事件，人们心中默念并用力揉捏骰子，相信这样做会掷出“双6”，符合“高估自己对事件的控制程度或影响力”，也低估了不可控因素的作用，符合定义，排除；

B项：一些股民仅借助“几个简单的因素”就认为自己能够预测大盘指数，符合“高估自己对事件的控制程度或影响力”，符合定义，排除；

C项：某企业经理认为运动会对企业发展有利，能够增加营业额，预测的是运动会对企业的影响，不符合“高估自己对事件的控制程度或影响力”，不符合定义，当选；

D项：某摆渡车驾驶员认为自己路况熟、技术好而在山路上开快车，体现了此人因为“高估自己对事件的控制程度或影响力”而进行了不安全的驾驶行为，符合定义，排除。

本题为选非题，故正确答案为C。`
   }, {
     id: 3,
     state: "3.用户名",
     answer: "admin34",
     optionName: "单选",
     collected: false,
     value: ''
   },
   {
     id: 4,
     state: "4.请问你是",
     answer: "admin999",
     optionName: "单选",
     option: ['1', '2', '3', '4'],
     collected: false,
     value: ''
   },
   {
     id: 5,
     state: "某幼儿园因为儿童调皮淘气，为了便于管理就取消了儿童户外体育活动时间，该幼儿园的做法（  ）。",
     answer: "C、不正确，不利于儿童的成长发展",
     optionName: "单选",
     option: ['A、不正确，不利于幼儿园体育老师的专业发展', 'B、正确，有利于儿童有充足时间学习知识', 'C、不正确，不利于儿童的成长发展', 'D、正确，有利于提高班级整体竞争力'],
     collected: false,
     value: ''
   }
 ]