<template>
  <q-page class="bg-grey-4">
    <q-img src="~/assets/diamonds.jpg" />
    <div class="q-pa-md">
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
        characterize a faceted diamond: color, clarity, cut and carat weight.
        The concept was simple, but revolutionary.
      </p>
      <p>
        His successor, President Richard T. Liddicoat, expanded his work by
        developing the now universally-utilized GIA D-to-Z Color Scale and GIA
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
</script>

<style scoped lang="scss">
p {
  font-size: 16px;
  line-height: 2;
}
</style>
