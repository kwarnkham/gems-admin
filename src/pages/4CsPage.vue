<template>
  <q-page class="bg-grey-4">
    <q-img src="~/assets/diamonds.jpg" />

    <div class="q-pa-md" v-if="locale == 'zh-CN'">
      <div class="text-h6 font-weight-bolder">为什么是4C？</div>
      <p>
        曾几何时，没有一致同意的标准来评估钻石。
        贸易商和珠宝商使用“河流”或“水”等术语来描述最无色的钻石，并使用“海角”来描述产自南非好望角地区的淡黄色钻石。
        钻石的切工被描述为“做得好”或“做得不好”。
      </p>
      <p>
        然后在 20 世纪 40 年代，GIA 创始人罗伯特·M·希普利 (Robert M. Shipley)
        创造了 4C
        一词，以帮助他的学生记住刻面钻石的四个特征：颜色、净度、切工和克拉重量。
        这个概念很简单，但却是革命性的。
      </p>
      <p>
        他的继任者理查德·T·李迪克 (Richard T. Liddicoat)
        总裁通过开发现在普遍使用的 GIA D 到 Z 钻石色度表和 GIA
        净度表来扩展他的工作。 他还建立了客观分级钻石质量的科学方法和程序。
      </p>
      <p>
        钻石 4C 和 GIA 国际钻石分级系统TM
        的创建意味着两件非常重要的事情：钻石质量可以用通用语言传达，钻石客户现在可以准确地知道他们所购买的是什么。
      </p>
      <p>
        如今，钻石质量 4C 标准已成为评估世界各地任何钻石质量的通用方法。
        作为钻石 4C 和国际钻石分级系统TM 的创建者，GIA 深受博物馆信赖。
        拍卖行和世界各地的消费者对大自然最好的珍宝进行评级。
      </p>
    </div>

    <div class="q-pa-md" v-else-if="locale == 'mm'">
      <div class="text-h6 font-weight-bolder">ဘာလို့ 4Cs ကိုသုံးတာလဲ?</div>
      <p>
        တစ်ချိန်က စိန်များကို အကဲဖြတ်နိုင်သည့် စံနှုန်းတစ်ခုမျှ မရှိခဲ့ပေ။
        ကုန်သည်များနှင့် ကျောက်မျက်ရတနာ လုပ်ငန်းရှင်များသည် စိန်၏
        ကြည်လင်တောက်ပမှုကို မြစ် သို့မဟုတ် ရေ ထဲစိမ်ပြီးဆုံးဖြစ်ခဲ့ကြသည်။
        စိန်တုံးကို "ကောင်းစွာပြုလုပ်သည်" သို့မဟုတ် "ညံ့ဖျင်းစွာပြုလုပ်ထားသည်"
        ဟု ၂မျိုးသာ ဖော်ပြနိုင်သည်။
      </p>
      <p>
        ထို့နောက် 1940 ခုနှစ်လောက်တွင် GIA တည်ထောင်သူ Robert M. Shipley သည် 4Cs
        ဟူသော အသုံးအနှုန်းဖြင့် စိန်တုံး၏ အချက်လေးချက်ဖြစ်သည့် အရောင်၊
        ပြတ်သားမှု၊ ဖြတ်တောက်မှုနှင့် ကာရက်အလေးချိန်တို့ကို ကျောင်းသားများ
        အလွယ်တကူမှတ်မိစေရန် သတ်မှတ်ခဲ့သည်။ နောက်ပိုင်းတွင် ထိုသတ်မှတ်ချက်က
        စိန်တုံး များကိုအရည်အသွေး ဆုံးဖြတ်သည့် စံနှုန်းသစ်အဖြစ် သတ်မှတ်လာကြသည်။
      </p>
      <p>
        Robert M. Shipley၏ဆက်ခံသူ Richard T. Liddicoat သည် ယခုအခါ
        ကမ္ဘာလုံးဆိုင်ရာ အသုံးပြုနေသော GIA D-to-Z Color Scale နှင့် GIA Clarity
        Scale ကို ဆက်လက်တီထွင်ခဲ့သည်။ စိန်တစ်လုံး၏ အရည်အသွေးကို ဓမ္မဓိဋ္ဌာန်ကျကျ
        အဆင့်သတ်မှတ်ရန်အတွက် သိပ္ပံနည်းကျ နည်းလမ်းများနှင့်
        လုပ်ထုံးလုပ်နည်းများကိုလည်း ချမှတ်ခဲ့သည်။
      </p>
      <p>
        Diamond 4Cs နှင့် GIA International Diamond Grading SystemTM
        ကိုဖန်တီးခြင်းသည် အလွန်အရေးကြီးသောအချက်နှစ်ချက်ကို သတ်မှတ်နိုင်ခဲ့သည်။-
        စိန်အရည်အသွေးကို လူတိုင်းကို ပြောဆိုရှင်းပြနိုင်ပြီး စိန်ဖောက်သည်များသည်
        ၎င်းတို့ဝယ်ယူသည့်စိန်များကို အတိအကျသိနိုင်ပြီဖြစ်သည်။
      </p>
      <p>
        ယနေ့တွင်၊ 4Cs of Diamond Quality သည် ကမ္ဘာပေါ်ရှိ မည်သည့်စိန်၏
        အရည်အသွေးကိုမဆို အကဲဖြတ်သည့် universal method ဖြစ်သည်။ Diamond 4Cs နှင့်
        International Diamond Grading SystemTM ကို ရောင်းဝယ်သူများမှအစ
        ပြတိုက်များ လေလံများ အထိ သဘာဝ၏အကောင်းဆုံးရတနာများကို တိုင်းတာရန်
        ယုံကြည်လက်ခံထားပါသည်။
      </p>
    </div>

    <div class="q-pa-md" v-else>
      <div class="text-h6 font-weight-bolder">Why the 4Cs?</div>
      <p>
        Once upon a time, there was no agreed-upon standard by which diamonds
        could be evaluated. Traders and jewelers used terms such as river or
        water to describe diamonds that were the most colorless, and Cape to
        describe pale yellow diamonds from South Africa's Cape of Good Hope
        region. A diamond's cut was described as "made well'" or "made poorly.
      </p>
      <p>
        Then in the 1940s, Robert M. Shipley, the founder of GIA, coined the
        term 4Cs to help his students remember the four factors that
        characterize a faceted diamond: color, clarity, cut, and carat weight.
        The concept was simple but revolutionary.
      </p>
      <p>
        His successor, President Richard T. Liddicoat, expanded his work by
        developing the now universally utilized GIA D-to-Z Color Scale and GIA
        Clarity Scale for diamonds. He also established the scientific methods
        and procedures for objectively grading a diamond's quality.
      </p>
      <p>
        The creation of the Diamond 4Cs and the GIA International Diamond
        Grading SystemTM meant two very important things: diamond quality could
        be communicated in a universal language and diamond customers could now
        know exactly what they are purchasing.
      </p>
      <p>
        Today, the 4Cs of Diamond Quality is the universal method for assessing
        the quality of any diamond, anywhere in the world. As the creator of the
        Diamond 4Cs and the International Diamond Grading SystemTM, GIA is
        trusted by museums. auctions houses, and consumers all over the world to
        grade nature's finest treasures.
      </p>
    </div>

    <FloatingActionButton @click="$router.go(-1)" icon="arrow_back" />
  </q-page>
</template>
<script setup>
import FloatingActionButton from "src/components/FloatingActionButton.vue";
import useLocale from "src/composables/locale";
const { locale } = useLocale();
</script>

<style scoped lang="scss">
p {
  font-size: 16px;
  line-height: 2;
}
</style>
