theorem cannot_be_proved_by_tauto (P Q : Prop) : (P → Q) → P → (P ∧ Q) :=
begin
intros h₀ h₁,
split,
end
